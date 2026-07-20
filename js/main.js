var avatarInput = document.getElementById("avatarInput");
var contactName = document.getElementById("contactName");
var contactPhone = document.getElementById("contactPhone");
var contactEmail = document.getElementById("contactEmail");
var contactAddress = document.getElementById("contactAddress");
var contactGroup = document.getElementById("contactGroup");
var contactNotes = document.getElementById("contactNotes");
var contactFavorite = document.getElementById("contactFavorite");
var contactEmergency = document.getElementById("contactEmergency");
var contactsCards = document.getElementById("contactsCards");
var createContactBtn = document.getElementById("createContactBtn");
var updateContactBtn = document.getElementById("updateContactBtn");
var updatedContactId = "";

var closeModalBtn = document.getElementById("closeModalBtn");
var contactModal = document.getElementById("contactModal");
var addContactBtn = document.getElementById("addContactBtn");
var totalContactsCard =  document.getElementById("totalContactsCard");
var totalFavoritesCard = document.getElementById("totalFavoritesCard");
var totalEmergencyCard = document.getElementById("totalEmergencyCard");
var favQuickAccessCard = document.getElementById("favQuickAccessCard");
var emergencyQuickAccessCard = document.getElementById("emergencyQuickAccessCard");

var contactNameError = document.getElementById("contactNameError");
var contactPhoneError = document.getElementById("contactPhoneError");
var contactEmailError = document.getElementById("contactEmailError");










var allContacts =  JSON.parse(localStorage.getItem("allContacts")) || [];


displayContact(allContacts);
displayFavouriteQuickAcress();
displayemergencyQuickAccess();

function createContact() {
   var contact = {
    fullName : contactName.value ,
    phone : contactPhone.value,
    email: contactEmail.value,
    address: contactAddress.value,
    groupPeople : contactGroup.value,
    note : contactNotes.value,
    favorite: contactFavorite.checked  ? contactFavorite.value : ""   ,
    emergency : contactEmergency.checked ? contactFavorite.value : "" ,

   } 
   
 
   allContacts.push(contact);
   localStorageHandler();
   displayContact(allContacts);
   displayFavouriteQuickAcress();
    displayemergencyQuickAccess();
    totalfavoritesHandler();
   totalEmergencyHandler();
   TotalContact();
   cleanForm();
   closeContactModal();
   
   
   
  

   
}


function displayContact(specificContacts) {
    var cartona = "";
    for (let i = 0; i < specificContacts.length; i++) {
        cartona += `<div class="contact-card col-12 col-md-6">
 
  <!-- Header -->
  <div class="contact-card__top">
    <div class="contact-card__head">
 
      <div class="contact-card__avatar-wrap">
        <div class="contact-card__avatar contact-card__avatar--orange">D</div>
 
        <div class="contact-card__badge contact-card__badge--emergency">
          <i class="fa-solid fa-heart-pulse"></i>
        </div>
 
        <div class="contact-card__badge contact-card__badge--favorite">
          <i class="fa-solid fa-star"></i>
        </div>
      </div>
 
      <div class="contact-card__head-info">
        <h3 class="contact-card__name">${specificContacts[i].fullName}</h3>
        <div class="contact-card__phone-row">
          <div class="contact-card__mini-icon contact-card__mini-icon--blue">
            <i class="fa-solid fa-phone"></i>
          </div>
          <span class="contact-card__phone-text">${specificContacts[i].phone}</span>
        </div>
      </div>
 
    </div>
 
    <!-- Contact Details -->
    <div class="contact-card__details">
 
      <div class="contact-card__detail-row">
        <div class="contact-card__detail-icon contact-card__detail-icon--violet">
          <i class="fa-solid fa-envelope"></i>
        </div>
        <span class="contact-card__detail-text">${specificContacts[i].email}</span>
      </div>
 
      <div class="contact-card__detail-row">
        <div class="contact-card__detail-icon contact-card__detail-icon--emerald">
          <i class="fa-solid fa-location-dot"></i>
        </div>
        <span class="contact-card__detail-text">${specificContacts[i].address}</span>
      </div>
 
    </div>
 
    <!-- Tags -->
    <div class="contact-card__tags">
      <span class="contact-card__tag contact-card__tag--group">${specificContacts[i].groupPeople}</span>
      <span class="contact-card__tag contact-card__tag--emergency">
        <i class="fa-solid fa-heart-pulse"></i> Emergency
      </span>
    </div>
 
  </div>
 
  <!-- Actions Footer -->
  <div class="contact-card__footer">
    <div class="contact-card__footer-group">
      <a href="tel:01032425314" class="contact-card__action contact-card__action--call" title="Call">
        <i class="fa-solid fa-phone"></i>
      </a>
      <button onclick="emailContact('gamilaahmedalihassan@gmail.com')" class="contact-card__action contact-card__action--email" title="Email">
        <i class="fa-solid fa-envelope"></i>
      </button>
    </div>
    <div class="contact-card__footer-group">
      <button class="contact-card__action contact-card__action--favorite" title="Favorite">
        <i class="fa-solid fa-star"></i>
      </button>
      <button  class="contact-card__action contact-card__action--emergency" title="Emergency">
        <i class="fa-solid fa-heart-pulse"></i>
      </button>
      <button onclick="updateContactHandler(${allContacts.indexOf(specificContacts[i])})" class="contact-card__action contact-card__action--edit" title="Edit">
        <i class="fa-solid fa-pen"></i>
      </button>
      <button  onclick="deleteContact(${allContacts.indexOf(specificContacts[i])})" class="contact-card__action contact-card__action--delete" title="Delete">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  </div>
 
</div>`
        
    } return contactsCards.innerHTML = cartona ;
}

function cleanForm() {
  contactName.value = "";
  contactPhone.value = "";
  contactEmail.value = "";
  contactAddress.value = "";
  contactGroup.value = "";
  contactNotes.value = "";
  contactFavorite.checked  = false;
  contactEmergency.checked = false;

}


function updateContactHandler(id) {
  openContactModal()
  updatedContactId = id;
  contactName.value = allContacts[id].fullName;
  contactPhone.value = allContacts[id].phone;
  contactEmail.value = allContacts[id].email;
  contactAddress.value = allContacts[id].address;
  contactGroup.value = allContacts[id].groupPeople;
  contactNotes.value = allContacts[id].note;
  contactFavorite.checked  = allContacts[id].favorite;
  contactEmergency.checked = allContacts[id].emergency;
  toggleBtnForms(true)
}

function onUpdateClick() {
  
     var contact = {
    fullName : contactName.value ,
    phone : contactPhone.value,
    email: contactEmail.value,
    address: contactAddress.value,
    groupPeople : contactGroup.value,
    note : contactNotes.value,
    favorite: contactFavorite.checked  ? contactFavorite.value : ""   ,
    emergency : contactEmergency.checked ? contactFavorite.value : "" ,

   } 

   allContacts.splice(updatedContactId , 1 , contact)
   localStorageHandler()
   displayContact(allContacts);
   displayFavouriteQuickAcress();
    displayemergencyQuickAccess();
   cleanForm();
  toggleBtnForms();
  closeContactModal();
  totalfavoritesHandler();
  totalEmergencyHandler();
  
}


function toggleBtnForms(hide) {
  if (hide) {
    createContactBtn.classList.add("d-none")
    updateContactBtn.classList.remove("d-none")
  }else{
    createContactBtn.classList.remove("d-none")
    updateContactBtn.classList.add("d-none")
  }
}

function deleteContact(index) {
  allContacts.splice(index,1);
   localStorageHandler()
   displayContact(allContacts);
   displayFavouriteQuickAcress();
    displayemergencyQuickAccess();
   TotalContact();
   totalfavoritesHandler();
   totalEmergencyHandler() 
   
}

function localStorageHandler() {
  localStorage.setItem("allContacts",JSON.stringify(allContacts));
}



function TotalContact() {
  totalContactsCard.innerHTML = `
   <div class="stat-icon stat-icon--blue">
                <i class="fa-solid fa-users text-white"></i>
              </div>
              <div>
                <p class="stat-label mb-0">Total</p>
                <p class="stat-value mb-0">${allContacts.length}</p>
              </div>
  `
}

TotalContact();



function totalfavoritesHandler() {
  var totalFavorites = 0;
  for (let i = 0; i < allContacts.length; i++) {
    if (allContacts[i].favorite) {
      totalFavorites += 1;
    }
    
  }
  totalFavoritesCard.innerHTML = `
  <div class="stat-icon stat-icon--amber">
                <i class="fa-solid fa-star text-white"></i>
              </div>
              <div>
                <p class="stat-label mb-0">Favorites</p>
                <p class="stat-value mb-0">${totalFavorites}</p>
              </div>
  `
}


totalfavoritesHandler()


function totalEmergencyHandler() {
  var totalEmergencies = 0 ;
  for (let i = 0; i < allContacts.length; i++) {
   if (allContacts[i].emergency) {
      totalEmergencies += 1;
   }
    
  }
  totalEmergencyCard.innerHTML = `
  <div class="stat-icon stat-icon--rose">
                <i class="fa-solid fa-heart-pulse text-white"></i>
              </div>
              <div>
                <p class="stat-label mb-0">Emergency</p>
                <p class="stat-value mb-0">${totalEmergencies}</p>
              </div>
  `
}

totalEmergencyHandler();


function displayFavouriteQuickAcress() {
  var cartona = "";
  for (let i = 0; i < allContacts.length; i++) {
    if (allContacts[i].favorite) {
      cartona += `
       <div class="favorite-card">
              <div class="favorite-card__avatar-wrap">
                <div class="favorite-card__avatar favorite-card__avatar--orange">D</div>
              </div>
              <div class="favorite-card__info">
                <h4 class="favorite-card__name">${allContacts[i].fullName}</h4>
                <p class="favorite-card__phone">${allContacts[i].phone}</p>
              </div>
              <a href="tel:${allContacts[i].phone}" class="favorite-card__call-btn">
                <i class="fa-solid fa-phone"></i>
              </a>
            </div>
      `
    }
    
  } return favQuickAccessCard.innerHTML = cartona;
}




function displayemergencyQuickAccess() {
  var cartona = "";
  for (let i = 0; i < allContacts.length; i++) {
   if (allContacts[i].emergency) {
     cartona += `
      <div class="emergency-card">
              <div class="emergency-card__avatar-wrap">
                <div class="emergency-card__avatar emergency-card__avatar--orange">D</div>
              </div>
              <div class="emergency-card__info">
                <h4 class="emergency-card__name">${allContacts[i].fullName}</h4>
                <p class="emergency-card__phone">${allContacts[i].phone}</p>
              </div>
              <a href="tel:${allContacts[i].phone}" class="emergency-card__call-btn">
                <i class="fa-solid fa-phone"></i>
              </a>
            </div>
     `
   }
    
  } return emergencyQuickAccessCard.innerHTML = cartona;
}



function openContactModal() {
   contactModal.classList.remove("d-none")
}

addContactBtn.addEventListener("click",function() {
  contactModal.classList.remove("d-none")
})

function closeContactModal() {
  contactModal.classList.add("d-none")
}
closeModalBtn.addEventListener("click",function() {
    contactModal.classList.add("d-none");
     cleanForm();
  })



function searchContacts(ele) {
 var filterdContact = [];
 for (let i = 0; i < allContacts.length; i++) {
 if ((allContacts[i].fullName).toLowerCase().includes(ele.value.toLowerCase())||(allContacts[i].phone).toLowerCase().includes(ele.value.toLowerCase()) || (allContacts[i].email).toLowerCase().includes(ele.value.toLowerCase()) ) {
  filterdContact.push(allContacts[i]);
 }
 }
 
  displayContact(filterdContact);
}




function inputNamevalidation(){
  var pattern = /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;
  var vaildName = new RegExp(pattern,"g")
   if (vaildName.test(contactName.value)) {
    contactName.classList.add("is-valid")
    contactName.classList.remove("is-invalid")
    contactNameError.classList.add("d-none")

   }else{
    contactName.classList.add("is-invalid")
    contactName.classList.remove("is-valid")
    contactNameError.classList.remove("d-none")
   }
  
  
}



function inputPhoneVaildation() {
  var pattern = /^01[0|1|2|4][0-9]{8}$/
  var vaildPhone = new RegExp(pattern,"g");
  if (vaildPhone.test(contactPhone.value)) {
    contactPhone.classList.add("is-valid")
    contactPhone.classList.remove("is-invalid")
    contactPhoneError.classList.add("d-none")
  } else {
     contactPhone.classList.remove("is-valid")
    contactPhone.classList.add("is-invalid")
    contactPhoneError.classList.remove("d-none")
  }
  
}


function inputEmailValidation() {
 var pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
 var vaildEmail = new RegExp(pattern , "g");
 if (vaildEmail.test(contactEmail.value)) {
  contactEmail.classList.add("is-valid")
  contactEmail.classList.remove("is-invalid")
  contactEmailError.classList.add("d-none")
 } else {
   contactEmail.classList.remove("is-valid")
  contactEmail.classList.add("is-invalid")
  contactEmailError.classList.remove("d-none")
 }
 
}