App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load pets.
    $.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function() {
    //Initialize web3 andset the provider to the testrpc
    if (typeof web3 !== 'undefined') {
      App.provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      //set provider you want from Web3.providers
      App.web3Provider = new web3.providers.HttpProvider('http://localhost:8545');
      web3 = new Web3(App.web3Provider)
    }

    return App.initContract();
  },

  initContract: function() {
  $.getJSON('Adoption.json', function(data){
    //Get necessary contract artifact file and instantiate it with truffle-contract.
    var AdoptionArtifact = data;
    App.contracts.Adoption = TruffleContract(AdoptionArtifact);

    // Set the provider for our contact.
    App.contracts.Adoption.setProvider(App.web3Provider);

    //Use our contract to retrieve and mark the adopted pets.
    return App.markAdopted();
  })

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  handleAdopt: function() {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     */
  },

  markAdopted: function(adopters, account) {
  var adoptionInstance;

  App.contacts.Adoption.deployed().then(function(instance) {
    adoptionInstance = instance;

    return adoptionInstance.getADopters.call();
  }).then(function(adopters) {
    for (var i = 0; i < adopters.length; i++) {
      if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
        $('.panel-pet').eq(i).find('button').text('Pending...').attr('disabled', true);
      }
    }
  }).catch(function(err) {
    console.log(err.message)
  })

  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
