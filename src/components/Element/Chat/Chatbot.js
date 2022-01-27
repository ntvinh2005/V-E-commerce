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
  } else if ((message.includes("create") && message.includes("account"))||(message.includes("sign up"))) {
    navigate("/signup");
  } else if (message.includes("log in")) {
    navigate("/login");
  } else if (message.includes("log out")) {
    return "To log out, you must go to click profile on navbar. Then click log out.";
  } else if (message.includes("bye")) {
    return "Goodbye. Hope to see you again soon!";
  } else {
    return "Sorry, I don't understand!";
  }
}
