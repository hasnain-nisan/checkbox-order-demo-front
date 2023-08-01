import axios from 'axios';

const Cart1 = () => {



  const initPay = async () => {
    console.log('clicked');
     try {
      const url = 'http://localhost/checkbox-v2/api/v2/sslcommerz/begin'; // Replace with your API endpoint URL
      // const data = { /* Your request data */ };
      const token = '83|0LSCzd0T3PCgHKLVDOTzQbGbVGYFCcjWveWTSdqi'; // Replace with your actual Bearer token

      // Define the custom headers and Bearer token
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'checkbox-api-v2-key': '83324867-6668-4c04-bf36-91714ea8b3e3',
      };

      const params = {
        'payment_type': "due_payment",
        'combined_order_id': 1,
        'amount': "50",
        'user_id': 1
      }

      // Make the POST request with Axios
      const response = await axios.get(url, { headers, params });

      // Handle the response data here
      console.log(response.data);
      if(response.data.url){
        window.location.href = (response.data.url)
      }
    } catch (error) {
      // Handle the error here
      console.error('Error making POST request:', error);
    }
  }

  return (
    <>
      <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          onClick={initPay}
        >
          <span>Pay now</span>
      </button>
    </>
  )
}

export default Cart1