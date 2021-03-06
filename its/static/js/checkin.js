function initAutoComplete(selector){ 
    selector.typeahead({
        minLength: 2,
        highlight: true
    }, {
            name: "main",
            source: source,
            displayKey: "odin",
            templates: {
                        suggestion: function (context) {
                            return ('<p>odin - full_name</p>'
                                    .replace('odin', context.odin)
                                    .replace('full_name', context.full_name));
                        }
            }
        })
        
        // Could also use selector.on .. etc
        // was on #id_ldap_search
        $('#id_username').on('typeahead:selected', function (object, datum) {
        // Example: {type: "typeahead:selected", timeStamp: 1377890016108, jQuery203017338529066182673: true, isTrigger: 3, namespace: ""...}
        console.log(object);

        // Datum containg value, tokens, and custom properties
        // Example: {value: "@JakeHarding", tokens: ['Jake', 'Harding'], name: "Jake Harding", profileImageUrl: "https://twitter.com/JakeHaridng/profile_img"}
        console.log(datum);
        $("#id_first_name").val(datum.first_name);
        $("#id_last_name").val(datum.last_name);
        $("#id_username").val(datum.odin);
        $("#id_email").val(datum.email);
        });
        
}

function possibleOwnerCheckbox(){ 
    
    if ($("#id_possible_owner_found").is(':checked')) {
        $(".PossibleOwner").slideDown("fast"); //Slide Down Effect
    }        
    else {
        $(".PossibleOwner").slideUp("fast");  //Slide Up Effect
    }

}




$(function(){
    // Shows/Hides possibleOwnerFound class fields when the possible owner found checkbox
    // is clicked on.
    $("#id_possible_owner_found").click(possibleOwnerCheckbox);

   
   
    // add the autocomplete functionality to all the odin fields, but make sure
    // to skip the subform template, which has '__prefix__' in its name
    initAutoComplete($("#id_username"));
   
}); 
