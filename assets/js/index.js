// Triggers when add user's save btn is clicked
$("#add_user").submit(function(e){
    alert("Data is successfully submitted!")
})




// Triggers when update user's save btn is clicked
$("#update_user").submit(function(e){ 
    e.preventDefault();
    
    // just collects the data from the form and make it as an array
    var unIndexed_Arr = $(this).serializeArray();
    var data = {};

    //Converts array to object for easy access
    $.map(unIndexed_Arr,function(n,i){
        data[n['name']] = n['value']
    })

    console.log("DATA is loaded: ",data);


    // Using ajax passing the particular data id to respective API and its method and data is also passed 
    var request = {
        "url":`http://localhost:3000/api/users/${data.id}`,
        "method":"PUT",
        "data":data
    }

    $.ajax(request).done(function(response){
        // location.href('/');
        alert("Data is successfully updated!")
        
    })
})





// When the location in home route only means delete method should me triggerd
if(window.location.pathname == '/'){
    $ondelete = $(".table tbody td a.delete")    //accessing the delete btm using class 
    $ondelete.click(function(){
        var id = $(this).attr("data-id")        // passing the id of the particular data mentioned int data-id attribute in show.ejs


         // Using ajax passing the particular data id to respective API and its method
        var request = {
            "url":`http://localhost:3000/api/users/${id}`,
            "method":"DELETE"
        }

        if(confirm("Do you want really delete the record")){   // Confirm is method in js to ask user ok or not
            $.ajax(request).done(function(response){
                alert("Data is deleted successfully!")
                location.reload()              // reloading the page after the data been deleted
            })
        }
    })
}