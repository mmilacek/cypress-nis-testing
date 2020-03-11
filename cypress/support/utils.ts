import * as _ from 'lodash';

declare global{
    namespace Utils{
        interface utils{
            generateRandomString(size: number): string;
            generateRandomFloat(): string;

            getAliasValue(form: any, formAction: string): string;
        }
    }
}

export default function generateRandomString(size: number){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  
    for (var i = 0; i < size; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}

export function generateRandomFloat(){
    return (Math.floor(Math.random() * Math.floor(10000))).toString() + '.23';
}

export function getAliasValue(form: any, formAction: string){
    var val: string;

    _.forEach(form, item => {
        if(item.alias){
            val = (formAction == 'create' ? item.formValueCreate : item.formValueUpdate);
        }
    });

    return val;
}

