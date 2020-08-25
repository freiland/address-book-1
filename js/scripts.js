// Business Logic for AddressBook --------- 
  //  Constructor
function AddressBook () {
  this.contacts = [];
  this.currentId = 0;
};

  // Prototype: Add Contact Method
AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
};

  // Prototype: Assign ID Method
AddressBook.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
};

  // Prototype: Find Contact Method
AddressBook.prototype.findContact = function(id) {
  for (let i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {     
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      };
    };                      
  };
  return false;
};

  // Prototype: Delete Contact Method
AddressBook.prototype.deleteContact = function(id) {
  for (let i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {     
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      };
    };                          
  };
  return false;
};


// Business Logic for Contacts ---------
  // Constructor
function Contact (firstName, lastName, phoneNumber, address) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.address = address;
};

  //  Prototype: Full Name Method
Contact.prototype.fullName = function() {
  return (this.firstName + " " + this.lastName);
};

  // Prototype: Update Method
Contact.prototype.update = function(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
};

  // Address
  function Address () {
    this.work = [];
    this.home = [];
  }; 


  Address.prototype.addWork = function(workArray) {
    for (work of workArray){
      this.work.push(work);
    };
  };

  Address.prototype.addHome = function(homeArray) {
    for (home of homeArray){
      this.home.push(home);
    };
  };

// User Interface Logic ---------
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);


  if (contact.address.work[0]){
    $("#work").html(contact.address.work)
  } else {
    $(".work").hide();
  };

  if (contact.address.home[0]){
    $("#home").html(contact.address.home)
  } else {
    $(".home").hide();
  };

  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
};

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function() {
  attachContactListeners(); 
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedWorkAddresses = $("input#new-work").val().split(",");
    const inputtedHomeAddresses = $("input#new-home").val().split(",");
  
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-work").val("");
    $("input#new-home").val("");

    let newAddress = new Address ();
    newAddress.addWork(inputtedWorkAddresses);
    newAddress.addHome(inputtedHomeAddresses);

    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, newAddress);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});