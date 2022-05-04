import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import numeral from 'numeral';

const Container = styled.div`
display : flex;
justify-content : center;
align-items : center;
flex-direction : column;
padding : 3rem 0;
max-width : 900px;
margin : auto;

h1{
    font-size : 35px;
    font-weight : 700;
    color: #131a3b;
    margin-bottom : 10px;
    text-transform : uppercase
}

h3{
    font-weight : 500;
    font-size : 20px;
    line-height : 28px;
    margin-top: 2rem;
    background: #fff;
    padding: 3rem;
    color: #2a6279;
    box-shadow: 0 0 1px 0 rgba(8, 11, 14, 0.06), 0 6px 6px -1px rgba(8, 11, 14, 0.1);
    border-radius: 1rem;
}

form{
    display: flex;
    flex-direction: column;
    justify-content : center;
    align-center : center;
    margin-top: 0.5rem;
}
`

const InputSection = styled.div`
        width: 45%;
        min-width: 350px;
        max-width: 450px;
        display : flex;
        flex-direction : column;
        padding :  1 rem;

        label {
            text-transform : uppercase;
            font-weight : 400;
            color:  ;
            margin-top : 1rem;
        }

        input {
            background : rgba(255, 255, 255, 0.3);
            height : 35px;
            border : 0;
            padding : 0 1rem; 
            color : #2a6279;
            font-weight : 500;
            box-shadow: 0 0 1px 0 rgba(8, 11, 14, 0.06), 0 6px 6px -1px rgba(8, 11, 14, 0.1);
            transition : all 0.3s ease-in-out;
            &:hover,
            &:focus{
                box-shadow: 0 0 1px 0 rgba(8, 11, 14, 0.06), 0 16px 16px -1px rgba(8, 11, 14, 0.1);

            }
        }

`
const SubmitButton = styled.button`
        background-color: black;
        color: #fff;
        border: none;
        width : 75px;
        height : 30px;
        font-family : 'Radio Canada', sans-serif ;
        font-size: 18px;
        line-height : 36px;
        border-radius: 2px;
        box-shadow: 0 0 1px 0 rgba(8, 11, 14, 0.06), 0 6px 6px -1px rgba(8, 11, 14, 0.1);
        cursor : pointer;
        margin-top: 1rem;
        transition: all 0.3s ease-in-out;
        &:hover{
                box-shadow: 0 0 1px 0 rgba(8, 11, 14, 0.06), 0 16px 16px -1px rgba(8, 11, 14, 0.1);
            }
`

const Error = styled.h4`
color : red;
font-size: 13px;
margin-bottom: 1rem;
`

const Form = () => {

    const [purchasePrice, setPurchasePrice] = useState("");
    const [downPayment, setDownPayment] = useState("");
    const [loanTerm, setLoanTerm] = useState("");
    const [loanApr, setLoanApr] = useState(2);
    const [monthlyPayments, setMonthlyPayments] = useState(0.0);

    const submitCalculation = async (e) => {
        e.preventDefault();

        //validate fields
        const validatePrice = await validateField(purchasePrice, setPurchasePrice);
        const validatePayment = await validateField(downPayment, setDownPayment);
        const validateLoanTerm = await validateField(loanTerm, setLoanTerm);
        const validateLoanApr = await validateField(loanApr, setLoanApr);

        //CalculateValues
        if(
            validatePrice &&
            validatePayment &&
            validateLoanTerm &&
            validateLoanApr
        ){
            console.log("form is fully validated");
            calculateValues();
        }
    };

    const calculateValues = () => {

        //M = P[i(1 + i)^n ] / [ (1 + i)^n - 1 ]
        //P = principal loan amount
        //i = monthly interest rate
        //n = number of months required to repay the loan

        let principal = purchasePrice - downPayment;
        let monthlyInterest = loanApr/100/12;
        let numberOfPayments = loanTerm * 12;
        let monthlyPrice = 
            (principal *
                [monthlyInterest * (1 + monthlyInterest) ** numberOfPayments])/
                [(1 + monthlyInterest) ** numberOfPayments - 1];
        setMonthlyPayments(monthlyPrice);
        console.log({principal});

    }

    const validateField = (field, setValue) => {
        let int = parseFloat(field);

        if(field === "" || field === 0) {
            setValue({ ...field.values, error: "Please Enter a Value" });
            return false;
        } else if(isNaN(int)) {
            setValue({ ...field.values, error: "Please Enter a Value" });
            return false;
        } else {
            setValue(int);
            return true;
        }
    }


  return (
    <Container>
        <h1>Mortgage Calculator</h1>
        <form>
            <InputSection>
                <label>Asking Price</label>
                <Error>{purchasePrice.error}</Error>
                <input 
                    onChange={(e) => setPurchasePrice(e.target.value)}
                    type="text" 
                />
            </InputSection>

            <InputSection>
                <label>Down Payment</label>
                <Error>{downPayment.error}</Error>
                <input 
                    onChange={(e) => setDownPayment(e.target.value)}
                    type="text" 
                />            
            </InputSection>

            <InputSection>
                <label>Amortization Period (Years)</label>
                <Error>{loanTerm.error}</Error>
                <input 
                    onChange={(e) => setLoanTerm(e.target.value)}
                    type="text" 
                />            
            </InputSection>

            <InputSection>
                <label>Mortgage Rate (Apr %)</label>
                <Error>{loanApr.error}</Error> 
                <input 
                    onChange={(e) => setLoanApr(e.target.value)}
                    type="text" 
                />           
             </InputSection>

             <SubmitButton onClick={(e) => submitCalculation(e)}>
                    Go
            </SubmitButton>
        </form>
        <h3>Total Mortgage Payment : {numeral(monthlyPayments).format("$0,0.00")}</h3>
    </Container>
  )
}

export default Form;
