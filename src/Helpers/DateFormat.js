export default function DateFormat(date){
    return new Date(date).toISOString().slice(0,10)
}