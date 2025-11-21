import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/AppointmentAI.module.css";

const AppointmentAI = () => {
  const [step, setStep] = useState(1);
  const [chat, setChat] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const [input, setInput] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    barber: "",
    date: "",
    time: "",
  });

  const barbers = ["Rahul", "Amit", "Sameer", "Vijay", "Any Barber"];

  const slots = {
    Rahul: ["10:00 AM", "11:00 AM", "1:00 PM"],
    Amit: ["9:30 AM", "12:00 PM", "4:00 PM"],
    Sameer: ["11:00 AM", "2:00 PM", "5:00 PM"],
    Vijay: ["10:30 AM", "1:30 PM", "3:30 PM"],
  };

  useEffect(() => {
    setChat([{ type: "bot", message: "👋 Hi! I’m your booking assistant. Let's get started!" }]);
  }, []);

  // Auto-scroll
//   useEffect(() => {
//     if (chatEndRef.current) {
//         chatEndRef.current.scrollIntoView({
//         behavior: "smooth",
//         block: "end",
//         });
//     }
//     }, [chat, isTyping]);

  // Bot reply
  const botSay = (message, nextStep = true) => {
    setIsTyping(true);

    setTimeout(() => {
      setChat((prev) => [...prev, { type: "bot", message }]);
      setIsTyping(false);

      if (nextStep) setStep((s) => s + 1);
    }, 700);
  };

  // Handle user input
  const handleUserInput = () => {
    const value = input.trim();
    if (!value) return;

    setChat((prev) => [...prev, { type: "user", message: value }]);

    // restart
    if (value.toLowerCase() === "restart") {
      setChat([{ type: "bot", message: "Restarting… 😊" }]);
      setStep(1);
      setForm({ name: "", phone: "", barber: "", date: "", time: "" });
      setInput("");
      return;
    }

    // validation logic
    if (step === 1) {
      if (value.length < 2) botSay("Enter at least 2 characters.", false);
      else {
        setForm((prev) => ({ ...prev, name: value }));
        botSay(`Nice to meet you, ${value}!`);
      }
    }

    else if (step === 2) {
      const digits = value.replace(/\D/g, "");
      if (digits.length !== 10) botSay("Please enter 10-digit phone number.", false);
      else {
        setForm((prev) => ({ ...prev, phone: digits }));
        botSay("Great! Whom would you like to book with?");
      }
    }

    else if (step === 3) {
      if (!barbers.includes(value))
        botSay(`Choose: ${barbers.join(", ")}`, false);
      else {
        setForm((prev) => ({ ...prev, barber: value }));
        botSay("Which date should I check?");
      }
    }

    else if (step === 4) {
      const today = new Date().toISOString().split("T")[0];
      if (value < today) botSay("Select today or future date.", false);
      else {
        setForm((prev) => ({ ...prev, date: value }));
        botSay("Checking available slots…");
        setStep(5); 
      }
    }

    setInput("");
  };

  // Choose barber
  const chooseBarber = (b) => {
    setChat((prev) => [...prev, { type: "user", message: b }]);
    setForm((prev) => ({ ...prev, barber: b }));

    if (b === "Any Barber") botSay("Okay! Assigning best available barber…");
    else botSay(`${b} is a great choice!`);
  };

  // Choose slot
  const chooseSlot = (s) => {
    let finalBarber = form.barber;

    if (form.barber === "Any Barber") {
      const flat = Object.entries(slots).flatMap(([barber, times]) =>
        times.map((t) => ({ barber, time: t }))
      );

      const earliest = flat.find((sl) => sl.time === s);
      finalBarber = earliest.barber;

      setForm((prev) => ({ ...prev, barber: finalBarber }));
    }

    setForm((prev) => ({ ...prev, time: s }));

    setChat((prev) => [...prev, { type: "user", message: s }]);

    botSay("Booking your appointment…");

    setTimeout(() => {
      botSay("🎉 Appointment confirmed!", false);
      botSay(generateSummary(), false);
      saveAppointment();
      setStep(999);
    }, 1000);
  };

  // Summary
  const generateSummary = () => `
📌 Booking Summary:
———————————
Name: ${form.name}
Phone: ${form.phone}
Barber: ${form.barber}
Date: ${form.date}
Time: ${form.time}
Booking ID: RC-${Math.floor(10000 + Math.random() * 99999)}
`;

  // Save to localStorage
  const saveAppointment = () => {
    let data = JSON.parse(localStorage.getItem("appointments") || "[]");
    data.push(form);
    localStorage.setItem("appointments", JSON.stringify(data));
  };

  return (
    <div className="card p-4 shadow-sm mb-5">

      <h3 className="fw-bold mb-3">AI Appointment Assistant 🤖</h3>

      {/* CHAT WINDOW */}
      <div className={styles.chatWindow}>
        {chat.map((c, i) => (
          <div key={i} className={`${styles.chatRow} ${c.type === "user" ? styles.user : ""}`}>
            {c.type === "bot" && (
              <img
                src="https://cdn-icons-png.flaticon.com/512/4712/4712107.png"
                className={styles.botAvatar}
              />
            )}

            <div className={c.type === "bot" ? styles.botBubble : styles.userBubble}>
              {c.message.split("\n").map((line, j) => (
                <div key={j}>{line}</div>
              ))}
            </div>

            {c.type === "user" && (
              <img
                src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                className={styles.userAvatar}
              />
            )}
          </div>
        ))}

        {isTyping && (
          <div className={styles.chatRow}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/4712/4712107.png"
              className={styles.botAvatar}
            />
            <div className={styles.typingDots}>● ● ●</div>
          </div>
        )}

        <div ref={chatEndRef}></div>
      </div>

      {/* INPUT FIELD */}
      {step <= 4 && (
        <div className="d-flex gap-2 mt-3">
          <input
            className="form-control"
            type={
                step === 4 
                ? "date"      // ⭐ DATE TYPE → CALENDAR WILL OPEN
                : "text"
            }
            placeholder={
                step === 1
                ? "Type your name…"
                : step === 2
                ? "Type phone…"
                : step === 3
                ? "Enter barber name…"
                : "Select date…"
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleUserInput()}
            />


          <button className="btn btn-primary" onClick={handleUserInput}>
            Send
          </button>
        </div>
      )}

      {/* BARBER BUTTONS */}
      {step === 3 && (
        <div className="d-flex flex-wrap gap-2 mt-3">
          {barbers.map((b, i) => (
            <button
              key={i}
              className="btn btn-outline-primary"
              onClick={() => chooseBarber(b)}
            >
              {b}
            </button>
          ))}
        </div>
      )}

      {/* SLOT BUTTONS */}
      {step === 5 && (
        <div className="d-flex flex-wrap gap-2 mt-3">
          {(form.barber === "Any Barber"
            ? Object.values(slots).flat()
            : slots[form.barber]
          ).map((s, i) => (
            <button
              key={i}
              className="btn btn-primary"
              onClick={() => chooseSlot(s)}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default AppointmentAI;
