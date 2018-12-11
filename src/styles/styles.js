import styled from "styled-components";

export const Button = styled.button`
	display: inline-block;
	color: palevioletred;
	font-size: 1em;
	margin: 1em;
	padding: 0.25em 1em;
	border: 2px solid palevioletred;
	border-radius: 3px;
`;

export const Container = styled.div`
	display: block;
	width: ${ props => props.width ? props.width : '100%' };
	max-width: 100%;
	margin: 0 auto;
	box-sizing: border-box;

	@media (max-width: 700px) {
    padding: 0 15px;
  }
`


export const ExchangeLabel = styled.label`
	color: #FFF;
	margin-bottom: 10px;
	`

export const ExchangeSelect = styled.select`
	width: 100%;
	height: 50px;
	border: 1px solid #5afac3;
	background: transparent;
	padding: 0 15px;
	border-radius: 3px;
	color: #FFF;
	
	&:focus {
		outline: none;
	}
`

export const ExchangeInput = styled.input`
	width: 100%;
	height: 50px;
	border: 1px solid #5afac3;
	background: transparent;
	padding: 0 15px;
	border-radius: 3px;
	color: #FFF;
	box-sizing: border-box;
	
	&:focus {
		outline: none;
	}
`

export const FlexGrid = styled.div`
	display: flex;
	justify-content: space-between;

	@media (max-width: 700px) {
    flex-direction: column;
  }
`

export const FlexGridItem = styled.div`
	display: flex;
	width: 100%;
	padding: 0 5px;
	margin-bottom: 10px;
	flex-direction: ${ props => props.direction ? props.direction : 'row' };
	box-sizing: border-box;
`

export const ExchangeValue = styled.div`
	color: #5afac3;
	width: 100%;
	padding: 25px 15px;
	text-align: center;
	font-size: 30px;
`

export const CustomChartTooltip = styled.div`
	background-color: #FFF;
	border-radius: 2px;
	padding: 15px;
`