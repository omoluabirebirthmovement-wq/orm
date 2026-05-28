/* Cultural Counseling AI Assistant (Omoluabi Guide) for ORM */

class OmoluabiChatbot {
  constructor() {
    this.name = "Omoluabi Guide";
    this.greetings = [
      "Aafia! I am the Omoluabi Guide. I am here to discuss character, legitimate skills, and help guide you through life's challenges. What is on your mind today?",
      "Ẹ n lẹ! Welcome to the Omoluabi Counseling Portal. Here, you can talk to me about peer pressures, leaving dark paths, or building a sustainable future. How can I support you?"
    ];
  }

  getResponse(userInput) {
    const text = userInput.toLowerCase().trim();
    
    // Greeting Checks
    if (this.containsAny(text, ["hello", "hi", "hey", "n lẹ", "baawo", "welcome", "greetings"])) {
      return "Greetings! How can I help you today? We can discuss digital skills, overcoming peer pressure, dealing with internet fraud, or how to speak to our counselors anonymously.";
    }

    // Internet Fraud / Yahoo Yahoo
    if (this.containsAny(text, ["yahoo", "fraud", "scam", "fast money", "client", "g-boy", "ritual", "cybercrime"])) {
      return `<strong>The glitz of 'Yahoo-Yahoo' is a dangerous illusion.</strong><br><br>
              In Yoruba culture, we say: <em>"Owo ti a ko ba sise fun, ko le pe lowo"</em> (Wealth gotten without labor does not last).<br><br>
              Internet fraud leads to constant anxiety, legal danger (EFCC), and erodes your character. But we do not judge you. If you want to step away from this lifestyle, ORM is here to help you redirect your computer and technical skills into legitimate coding, writing, and digital design.<br><br>
              👉 <a href="#booking" onclick="window.router('booking-view')"><strong>Book a Repentance & Transformation Consultation</strong></a> to speak with a mentor who will guide you onto a legal path. We keep all counseling 100% confidential.`;
    }

    // Cultism & Violence
    if (this.containsAny(text, ["cult", "cultism", "initiate", "aye", "eye", "confraternity", "violence", "threat"])) {
      return `<strong>Your safety and character are worth more than any cult membership.</strong><br><br>
              Cultism promises protection but brings only fear, violence, and premature death. Real power lies in character, self-discipline, and community building.<br><br>
              If you are being intimidated or threatened to join a cult, or want to exit one safely:<br>
              1. Do not agree to meet them in isolated locations.<br>
              2. Submit a completely anonymous report to us.<br><br>
              👉 <a href="#counseling" onclick="window.router('counsel-view')"><strong>Go to the Safe Reporting Portal</strong></a>. We will work secretly with local community leaders and schools to protect you without revealing your name.`;
    }

    // Drugs & Substance Abuse
    if (this.containsAny(text, ["drug", "drugs", "codeine", "tramadol", "smoke", "loud", "colorado", "addiction", "abuse"])) {
      return `<strong>Addiction is a battle you do not have to fight alone.</strong><br><br>
              Substance abuse acts as a temporary escape but slowly steals your health, focus, and future. We understand the pressures that lead to this, and we want to help you rebuild your strength.<br><br>
              Our counselors can connect you with friendly, judgment-free support and rehabilitation partners.<br><br>
              👉 <a href="#counseling" onclick="window.router('counsel-view')"><strong>Book counseling</strong></a> or call/WhatsApp our urgent help line: <strong>+234 9049656467</strong>. Healing starts with a single honest conversation.`;
    }

    // Depression / Mental Health
    if (this.containsAny(text, ["depressed", "depression", "sad", "die", "suicide", "lonely", "stress", "pressure"])) {
      return `<strong>Please hold on. You are extremely valuable, and this generation needs your unique story.</strong><br><br>
              In tough moments, it feels like the darkness will never end, but support is available. We care about your life and your future.<br><br>
              Please take a brave step and speak to one of our friendly counselors immediately. You can remain completely anonymous if you wish.<br><br>
              📞 <strong>WhatsApp/Call:</strong> +234 9049656467<br>
              👉 <a href="#counseling" onclick="window.router('counsel-view')"><strong>Submit an anonymous cry for help</strong></a> in our counseling tab, and a certified counselor will reach out to you within hours.`;
    }

    // Digital Skills / Entrepreneurship
    if (this.containsAny(text, ["skills", "digital", "coding", "code", "learn", "program", "work", "job", "money", "legit"])) {
      return `<strong>The digital economy is full of legitimate wealth!</strong><br><br>
              You don't need to scam when you can earn with honor. By learning software engineering, UI/UX design, copywriting, video editing, or marketing, you can work for international companies right from Nigeria.<br><br>
              ORM offers free and discounted boot camps for motivated youths. In Yoruba, we say: <em>"Ise l'ogun ise"</em> (Hard work is the antidote to poverty).<br><br>
              👉 <a href="#events" onclick="window.router('events-view')"><strong>Check our upcoming Events & boot camps</strong></a> or register to join our next cohort!`;
    }

    // Yoruba Culture / Omoluabi Definition
    if (this.containsAny(text, ["yoruba", "omoluabi", "culture", "meaning", "proverb", "what is"])) {
      return `<strong>An Omoluabi is a person of exceptional character.</strong><br><br>
              It represents the highest moral standard in Yoruba civilization, centered on:<br>
              • <strong>Otito</strong> (Truthfulness)<br>
              • <strong>Iteriba</strong> (Respect and humility)<br>
              • <strong>Inu rere</strong> (Good intentions toward others)<br>
              • <strong>Oro siso</strong> (Keeping one's word)<br>
              • <strong>Igboya</strong> (Moral courage)<br>
              • <strong>Ise</strong> (Industriousness and honest labor)<br><br>
              We believe that <em>"Iwa l'ewa"</em> (Character is beauty) and <em>"Ranti omo eni ti iwo nse"</em> (Remember whose child you are). Let us restore these values together!`;
    }

    // Joining/Volunteering
    if (this.containsAny(text, ["join", "volunteer", "ambassador", "register", "apply"])) {
      return `<strong>We would love to have you in the movement!</strong><br><br>
              Whether you want to be a school coordinator, volunteer your skills, or become an ambassador of change in your community, your voice is powerful.<br><br>
              👉 <a href="#join" onclick="window.router('join-view')"><strong>Go to our Join Page</strong></a> and fill out our quick registration form. Together, we are rebuilding a generation.`;
    }

    // Default response
    return `Thank you for sharing that with me. As your Omoluabi Guide, I want to remind you that your character is your greatest wealth.<br><br>
            If you are going through a difficult time, need help, or want to discuss skills development, you can:<br>
            • Type keywords like 'fraud', 'drugs', 'skills', 'cultism', or 'depressed' for specific resources.<br>
            • Send a WhatsApp message to our counseling hotline: <strong>+234 9049656467</strong>.<br>
            • Speak directly to a human mentor by booking an appointment in the counseling tab.`;
  }

  containsAny(text, keywords) {
    return keywords.some(keyword => text.includes(keyword));
  }
}

window.chatbot = new OmoluabiChatbot();
console.log("Omoluabi AI Chatbot Engine online.");
