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
  }


// Business Logic for Contacts ---------
  // Constructor
function Contact (firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
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