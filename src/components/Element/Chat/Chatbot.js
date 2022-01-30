export function robotThinking(message, user, navigate) {
  message = message.toLowerCase();
  if (message.includes("hello") || message.includes("hi")) {
    return "Hi, what would you like?, " + user.email;
  } else if (message.includes("you") && message.includes("what")) {
    return "I am Mr V's bot. I'm here to help you, " + user.email;
  } else if (message.includes("how old")) {
    return "I'm a genuine baby bot. Can you guess how old am I?";
  } else if (message.includes("you") && message.includes("how")) {
    return "I'm fine, thank you. Have a nice day when shopping in our mall!";
  } else if (message.includes("how old")) {
    return "I'm a genuine baby bot. Can you guess how old am I?";
  } else if (message.includes("thanks") || message.includes("thank you")) {
    return "No problem. I'm happy to help you";
  } else if (
    message.includes("father") ||
    message.includes("creator") ||
    message.includes("developer")
  ) {
    return "Mr.V is my great father. He's kind, handsome and energetic. You can contact with him in mall's chat at this fake address: developer@mail.com.";
  } else if (message.includes("sell") || message.includes("my shop")) {
    return "Go to dashboard. You can find two buttons to create folders and items (for sell). Lucky with your business";
  } else if (message.includes("price") || message.includes("fee") || message.includes("expense") || message.includes("expenditure")) {
    return "It's depended on lots of factors. We believe you, custommers and sellers have the right to control it. Take your time!";
  } else if (message.includes("who") && message.includes("you")) {
    return "I'm a super English AI created in the heaven. I'm here to help you with your problem.";
  } else if (message.includes("how") && message.includes("buy")) {
    return "Click on cart icon on the item that you want to buy.";
  } else if (message.includes("where")) {
    return "We're visting the most wonderful virtual mall in the world.";
  } else if (message.includes("time")) {
    var day = new Date(Date.now());
    return (
      "It's " +
      day.getDate() +
      "/" +
      (day.getMonth() + 1) +
      "/" +
      day.getFullYear() +
      " " +
      day.getHours() +
      ":" +
      day.getMinutes()
    );
  } else if (message.includes("profile") || message.includes("email")) {
    return "Your email is " + user.email;
  } else if (message.includes("password")) {
    return "Trust me, your password is a secret. If you forget it, click on profile on navbar. Then update profile";
  } else if (
    (message.includes("create") && message.includes("account")) ||
    message.includes("sign up")
  ) {
    navigate("/signup");
  } else if (message.includes("log in") || message.includes("login")) {
    navigate("/login");
  } else if (message.includes("log out")) {
    return "To log out, you must go to click profile on navbar. Then click log out.";
  } else if (message.includes("bye")) {
    return "Goodbye. Hope to see you again soon!";
  } else {
    return "Sorry, I haven't learnt those words!";
  }
}
