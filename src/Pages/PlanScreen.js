import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  addDoc,
  getDoc,
} from "firebase/firestore";
import { loadStripe } from "@stripe/stripe-js";
import db from "../firebase";
import { selectUser } from "../features/userSlice";
import "./PlanScreen.css";

const PlanScreen = () => {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    const productRef = collection(db, "products");
    const q = query(productRef, where("active", "==", true));

    const products = {};
    onSnapshot(q, (querySnapShot) => {
      querySnapShot.forEach(async (productDoc) => {
        products[productDoc.id] = productDoc.data();

        const priceSnap = await getDocs(collection(productDoc.ref, "prices"));
        priceSnap.docs.forEach((price) => {
          products[productDoc.id].prices = {
            priceId: price.id,
            priceData: price.data(),
          };
        });
      });
      setProducts(products);
    });
  }, []);
  console.log(products);

  const loadCheckout = async (priceId) => {
    const docRef = collection(db, `customers/${user.uid}/checkout_sessions`);
    const general = await addDoc(docRef, {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

    const querySnapshot = await getDocs(docRef);
    querySnapshot.forEach(async (doc) => {
      const { error, sessionId } = doc.data();

      if (error) {
        //Show an error to your customer and
        //inspect your cloud function logs in the Firebase console.
        alert("An error occured: ${error.message}");
      }
      if (sessionId) {
        //We have a session lets redirect to Checkout
        //Init Stripe
        const stripe = await loadStripe(
          "pk_test_51Oogo8SFhRQPXEm7wz7maJMCtmIS1WVJf8BgXZ4vtu4ESz8tW01tl5U2oC5NEuFSGjtarDmRnEFGfz45RgVwOnUy00wR3n5rOZ"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className="plansScreen">
      {Object.entries(products).map(([productId, productData]) => {
        return (
          <div className="plansScreen_plan" key={productId}>
            <div className="plansScreen_info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button onClick={() => loadCheckout(productData.prices.priceId)}>
              Subscribe
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PlanScreen;
