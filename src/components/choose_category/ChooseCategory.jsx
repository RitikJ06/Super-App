import HeadingImg from '../images/Super_App_Heading.svg'
import './ChooseCategory.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function CategoryCard(props) {
  return (
    <div className='categorCard' style={!(props.categoryList.includes(props.heading)) ? {background: props.color, border:"6px solid " + props.color} : {background: props.color, border:"6px solid #11B800"}} onClick={(e) => {
            if (!(props.categoryList.includes(props.heading))){
                props.setCategoryList([...props.categoryList, props.heading]);
            }
        }
        }>
        <h1 className='cardHeading'>{props.heading}</h1>
        <img className='cardImage' src={props.imgPath} />
        <div className='categoryList'>
        </div>
    </div>
  )
}


export default function ChooseCategory() {
  const [errorMsg, setErrorMsg] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();

  function saveAndNextPage(){
    if(categoryList.length >= 3){
        // save the date to local storage
        localStorage.setItem("categoriesList", JSON.stringify(categoryList));
        navigate('/home');
    }
    else{
        setErrorMsg("Select atleast 3 categories to continue!");
    }
  }

  return (
    <div className='RegisterSection'>
        <section className='chooseCategory'>
            <div className='categoryHeadingSection'>
                <div className='categoryHeadingSectionWrapper'>
                    <div className='imageHeadingWrapper'>
                        <img className='supperAppImg' src={HeadingImg}/>
                        <h1 className='entertainmentCategoryHeading'>Choose your entertainment category</h1>
                    </div>
                    <div className='SeletedCategories'>
                        {categoryList.map((category) =>{
                            return (
                                <div className='categoryItem'>
                                    <span className='categoryName'>{category}</span>
                                    <span className='crossSign' onClick={() => {
                                        setCategoryList(categoryList.filter((toKeepCategory) => toKeepCategory !== category));
                                    }
                                        }>
                                        {'x'}
                                    </span>
                                </div>
                                );
                            }
                        )}
                    </div>
                        
                </div>
            </div>

            <div className='categoryCardsSection'>
                <CategoryCard color='#FF5209' heading='Action' imgPath={require('../images/1.png')} categoryList={categoryList} setCategoryList={setCategoryList}/>
                <CategoryCard color='#D7A4FF' heading='Drama' imgPath={require('../images/2.png')} categoryList={categoryList} setCategoryList={setCategoryList}/>
                <CategoryCard color='#148A08' heading='Romance' imgPath={require('../images/3.png')} categoryList={categoryList} setCategoryList={setCategoryList}/>
                <CategoryCard color='#84C2FF' heading='Thriller' imgPath={require('../images/4.png')} categoryList={categoryList} setCategoryList={setCategoryList}/>
                <CategoryCard color='#912500' heading='Western' imgPath={require('../images/5.png')} categoryList={categoryList} setCategoryList={setCategoryList}/>
                <CategoryCard color='#7358FF' heading='Horror' imgPath={require('../images/6.png')} categoryList={categoryList} setCategoryList={setCategoryList}/>
                <CategoryCard color='#FF4ADE' heading='Fantasy' imgPath={require('../images/7.png')} categoryList={categoryList} setCategoryList={setCategoryList}/>
                <CategoryCard color='#E61E32' heading='Music' imgPath={require('../images/8.png')} categoryList={categoryList} setCategoryList={setCategoryList}/>
                <CategoryCard color='#6CD061' heading='Fiction' imgPath={require('../images/9.png')} categoryList={categoryList} setCategoryList={setCategoryList}/>
            </div>

        </section>
        <section className='nextPageSection'>
            <p className='errorMsg'>{errorMsg}</p>
            <button className='nextPageBtn' onClick={saveAndNextPage}>Next Page</button>
        </section>
    </div>
  )
}
