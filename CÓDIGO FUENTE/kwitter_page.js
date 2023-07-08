var firebaseConfig = { 
    apiKey: "AIzaSyBBecWwoEhLyzfqUUIPxZgHEypo_2VrA4k", 
    authDomain: "kwitter-final-6a1c8.firebaseapp.com", 
    databaseURL: "https://kwitter-final-6a1c8-default-rtdb.firebaseio.com", 
    projectId: "kwitter-final-6a1c8", 
    storageBucket: "kwitter-final-6a1c8.appspot.com", 
    messagingSenderId: "185135246257", 
    appId: "1:185135246257:web:7c601a0941dcdd7e9aeb90" }; 
    firebase.initializeApp(firebaseConfig);
    user_name=localStorage.getItem("user_name");
    room_name=localStorage.getItem("room_name");
    function send(){
        msj=document.getElementById("msj").value;
        firebase.database().ref(room_name).push({
            name:user_name,
            message:msj,
            like:0
        });
        document.getElementById("msj").value="";
    }
    function getData(){
        firebase.database().ref("/" + room_name).on('value', function (snapshot) { 
              document.getElementById("output").innerHTML = ""; 
              snapshot.forEach(
              function (childSnapshot) { 
                    childKey = childSnapshot.key; 
                    childData = childSnapshot.val();
                    if (childKey != "purpose") { 
                          firebase_message_id = childKey; 
                          message_data = childData; 
                          //Inicia código 
                          console.log(firebase_message_id); 
                          console.log(message_data); 
                          name = message_data['name']; 
                          message = message_data['message']; 
                          like = message_data['like'];
                          name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'>"; 
                          message_with_tag = "<h4 class='message_h4'>" + message + "</h4>"; 
                          like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>"; 
                          span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>"; 
                          row = name_with_tag + message_with_tag + like_button + span_with_tag; 
                          document.getElementById("output").innerHTML += row; 
                          //Termina código 
                    }
                 }); 
              });
  }
  getData();
  function updateLike(mesajeID){
    bottonID=mesajeID; 
    likes= document.getElementById(bottonID).value;
    newlikes=Number(likes)+1;
    firebase.database().ref(room_name).child(mesajeID).update({
        like:newlikes
    });
  }
  function salir(){
    window.location.replace("index.html")
    localStorage.removeItem("user_name")
}