
import './App.css'
// import Welcome from './Components/firstComp'
// import Text from './Components/secondComp'
// import Thanks from './Components/thirdComp'
import Card from './Components/Card'

function App() {
  const card1 = {
    imgUrl:'https://nayopes.github.io/homework.github.io/book1.JPG',
    imgAlt:'George Orwel book',
    imgText:'A novel is a dystopiam social science fiction novel by English novelist George Orwell.',
    imgTitle:'George Orwell'
  };
  const card2 = {
    imgUrl:'https://nayopes.github.io/homework.github.io/book2.JPG',
    imgAlt:'Erich Maria Remark book',
    imgText:'The novel is set in the fictional Mellern concentration labor camp during the Holocaust.',
    imgTitle:'Erich Remarque'
  };
  const card3 = {
    imgUrl:'https://nayopes.github.io/homework.github.io/book3.JPG',
    imgAlt:'Sergey Yesenin book',
    imgText:'He is one of the most popular and well-known Russian poets of the 20th century.',
    imgTitle:'Sergei Yesenin'
  };

  return (
    <div className="App">
      {/* <Welcome />
      <Text />
      <Thanks /> */}
      <div className="card_wrapper">
        <Card title={card1.imgTitle} img={card1.imgUrl} imgAlt={card1.imgAlt} text={card1.imgText} />
        <Card title={card2.imgTitle} img={card2.imgUrl} imgAlt={card2.imgAlt} text={card2.imgText} />
        <Card title={card3.imgTitle} img={card3.imgUrl} imgAlt={card3.imgAlt} text={card3.imgText} />
      </div>
    </div>
  )
}

export default App
