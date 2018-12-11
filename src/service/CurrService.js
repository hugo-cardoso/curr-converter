import moment from 'moment';

class CurrService {

    constructor(){

        this.url = `http://free.currencyconverterapi.com/api/v6`;
    }

    parserConversionData(data) {
        
        return new Promise((resolve) => {
            
            data.then(res => {

                const inData = Object.keys(res[Object.keys(res)[0]]);

                const historic = inData.map(item => {
                    return {
                        name: moment(item).format('DD/MM'), 
                        value: res[Object.keys(res)[0]][item]
                    };
                });
                const actual = historic[(historic.length - 1)];

                let newData = {
                    historic,
                    actual
                }
    
                resolve(newData);
            });
        });
    }

    parserCurrenciesData( oldData ) {

        console.log(oldData)

        return new Promise((resolve) => oldData.then(data => { 

            let newData = Object.keys(data.results).map(item => data.results[item]);

            newData.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));

            resolve(newData);        
        }));
    }
    
    convert(from, to) {

        const date = moment().subtract(8,'days').format('YYYY-MM-DD');
        const endDate = moment().format('YYYY-MM-DD');

        return fetch(`${ this.url }/convert?q=${ from }_${ to }&compact=ultra&date=${ date }&endDate=${ endDate }`).then(data => this.parserConversionData(data.json()))
    }

    currencies() {
        
        return fetch(`${ this.url }/currencies`).then(data => this.parserCurrenciesData( data.json() ));
    }
}

export default CurrService;