export class StringUtils {
    static capitalize(str:string|null){
         if (!str) return '';
         let lowercase = str.toLowerCase();
         return lowercase[0].toUpperCase() + lowercase.substr(1);
    }
    static camelCaseToRegular(string:string, capFirstLetter=false){
         if (capFirstLetter) string = string.charAt(0).toUpperCase() + string.substr(1);
         return (
             string
                 .replace(/([a-z])([A-Z])/g, '$1 $2')
                 .replace(/([A-Z])([a-z])/g, ' $1$2')
                 // eslint-disable-next-line
                 .replace(/\ +/g, ' ')
         )
    }
}