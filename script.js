function selectOption(optionId) {
    document.getElementById(optionId).checked = true;
}
const amountInp = document.querySelector('.amountInp');
const termInp = document.querySelector('.termInp');
const rateInp = document.querySelector('.rateInp');

const getResults = () => {

    const principal = parseFloat(amountInp.value);
    const annualInterestRate = parseFloat(rateInp.value) / 100;
    const termYears = parseInt(termInp.value);

    const monthlyInterestRate = annualInterestRate / 12;
    const totalNoRepayments = termYears * 12;

    const monthlyRepayments = (principal * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalNoRepayments)) / (Math.pow(1 + monthlyInterestRate, totalNoRepayments) - 1)).toFixed(2);

    const totalRepayments =( monthlyRepayments * totalNoRepayments).toFixed(2);

    const resultsDiv = document.getElementById('results');
    if(amountInp.value || termInp.value || rateInp.value === ""){
        document.querySelector(".years").classList.add('error') 
        document.querySelector(".amount").classList.add('error') 
        document.querySelector(".percentage").classList.add('error') 
        amountInp.classList.add('errorInp') 
        termInp.classList.add('errorInp') 
        rateInp.classList.add('errorInp')
        resultsDiv.innerHTML = `
        <div>
        <img src="/assets/images/illustration-empty.svg" alt="illustration-empty">
      </div>
      <div>
        <h1>Results shown here</h1>
        <p class="intro">Complete the form and click "Calculate Repayments" to <br> see what your monthly repayments would be .</p>
      </div>
        `
    }if(amountInp.value && termInp.value && rateInp.value !== ""){
        document.querySelector(".years").classList.remove('error') 
        document.querySelector(".amount").classList.remove('error') 
        document.querySelector(".percentage").classList.remove('error') 
        amountInp.classList.remove('errorInp') 
        termInp.classList.remove('errorInp') 
        rateInp.classList.remove('errorInp') 
    resultsDiv.innerHTML = `
    <div>
    <h2>Your Results</h2>
    <p class="resultPara">Your results are shown below based on the information <br> you provided. To adjust results, edit the form and <br> click "Calculate Repayments" again.</p>
    </div>
    <div class="resultsBox">
        <div>
        <p class="resultPara">Your monthly repayments</p>
        <h2 class="resultNum">$${monthlyRepayments.toLocaleString('en-US', {style : 'currency' , 'currency' : 'USD'})}</h2>
        </div>
        <hr>
        <div> 
        <p class="resultPara">Total you'll repay over the term</p>
        <span> 

        $${totalRepayments.toLocaleString('en-US', {style : 'currency' , 'currency' : 'USD'})}</span>
        </div>
    </div>
    `;
    }
}
const clearAll = () => {
     if (amountInp.value !== '' || termInp.value !== "" || rateInp.value !== "") {
        amountInp.value = '';
        termInp.value = ''
        rateInp.value = ''
        return true; 
    }
    return false; 
}
document.querySelector('.clrBtn').addEventListener('click' , () => clearAll())