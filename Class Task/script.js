function calculateGroceryBill() {
    var price = parseFloat(document.getElementById("Price").value);
    var quantity = parseInt(document.getElementById("Quantity").value, 10);

    if (isNaN(price) || isNaN(quantity) || price < 0 || quantity < 0) {
        alert("Please enter valid non-negative values for price and quantity.");
        return;
    }

    var totalBill = price * quantity;
    if(quantity >=  5){
        
        totalBill = totalBill - (totalBill * 0.10);
    }
    
    document.getElementById("TotalBill").value = totalBill.toFixed(2);
    console.log("Grocery Bill Calculated: " + totalBill.toFixed(2));
}