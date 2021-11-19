const express = require('express')
const Razorpay = require('razorpay')
const https = require ('https')

let app = express()

const razorpay = new Razorpay({
    key_id: 'rzp_test_BnNk9Z3AEdgaGV',
    key_secret: 'tDtj8UgMlCVv7A1ni9Yc0vdv',

})


app.set('views','views')
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))



var options = {
  amount: 50000,
  currency: "INR",
  receipt: "receipt#1",
  notes: {
    key1: "value3",
    key2: "value2"
  }
};

app.get('/',function(req,res){
    var key = "";
    razorpay.orders.create(options,
       function(err, order) {
          key=order.id,
          console.log(key),
          console.log(order),
          res.render('razorpay.ejs', {keyid: key,fname : "goodboy"});});
    //res.render('razorpay.ejs', {keyid: key,fname : "goodboy"});
    console.log(key);

    
    
    
})




app.get('payment.success', function (response){
    alert(response.razorpay_payment_id);
    alert(response.razorpay_order_id);
    alert(response.razorpay_signature)
})

app.get('payment.failed', function (response){
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
})


app.listen(5000)
