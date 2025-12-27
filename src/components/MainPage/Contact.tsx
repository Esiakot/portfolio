import React from "react";
import styles from "@/styles/MainPage/Contact.module.css";

export default function Contact() {
  return (
    <div className={styles.contact}>
      <h2 className={styles.contactTitle}>Contactez-moi</h2>
      <form className={styles.contactForm} onSubmit={(e) => e.preventDefault()}>
        <label className={styles.label}>
          Nom
          <input
            className={styles.input}
            type="text"
            name="name"
            placeholder="Votre nom"
            required
          />
        </label>
        <label className={styles.label}>
          Email
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="Votre email"
            required
          />
        </label>
        <label className={styles.label}>
          Message
          <textarea
            className={styles.textarea}
            name="message"
            placeholder="Votre message"
            required
          />
        </label>
        <button className={styles.button} type="submit">
          Envoyer
        </button>
      </form>
    </div>
  );
}
