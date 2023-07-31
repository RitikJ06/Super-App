import HeadingImg from "../images/Super_App_Heading.svg";
import "./ChooseCategory.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CategoryCard(props) {
  return (
    <div
      className="categorCard"
      style={
        !props.categoryList.includes(props.heading)
          ? { background: props.color, border: "6px solid " + props.color }
          : { background: props.color, border: "6px solid #11B800" }
      }
      onClick={(e) => {
        if (!props.categoryList.includes(props.heading)) {
          props.setCategoryList([...props.categoryList, props.heading]);
        }
      }}
    >
      <h1 className="cardHeading">{props.heading}</h1>
      <img className="cardImage" src={props.imgPath} alt={props.heading}/>
      <div className="categoryList"></div>
    </div>
  );
}

export default function ChooseCategory() {
  const categoryData = [
    { color: "#FF5209", heading: "Action", img: "/images/1.png" },
    { color: "#D7A4FF", heading: "Drama", img: "./images/2.png" },
    { color: "#148A08", heading: "Romance", img: "./images/3.png" },
    { color: "#84C2FF", heading: "Thriller", img: "./images/4.png" },
    { color: "#912500", heading: "Western", img: "./images/5.png" },
    { color: "#7358FF", heading: "Horror", img: "./images/6.png" },
    { color: "#FF4ADE", heading: "Fantasy", img: "./images/7.png" },
    { color: "#E61E32", heading: "Music", img: "./images/8.png" },
    { color: "#6CD061", heading: "Fiction", img: "./images/9.png" }
  ];

  const [errorMsg, setErrorMsg] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();

  function saveAndNextPage() {
    if (categoryList.length >= 3) {
      // save the date to local storage
      localStorage.setItem("categoriesList", JSON.stringify(categoryList));
      navigate("/home");
    } else {
      setErrorMsg("Select atleast 3 categories to continue!");
    }
  }

  return (
    <div className="RegisterSection">
      <section className="chooseCategory">
        <div className="categoryHeadingSection">
          <div className="categoryHeadingSectionWrapper">
            <div className="imageHeadingWrapper">
              <img className="supperAppImg" src={HeadingImg} />
              <h1 className="entertainmentCategoryHeading">
                Choose your entertainment category
              </h1>
            </div>
            <div className="SeletedCategories">
              {categoryList.map((category) => {
                return (
                  <div className="categoryItem" key={category}>
                    <span className="categoryName">{category}</span>
                    <span
                      className="crossSign"
                      onClick={() => {
                        setCategoryList(
                          categoryList.filter(
                            (toKeepCategory) => toKeepCategory !== category
                          )
                        );
                      }}
                    >
                      {"x"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="categoryCardsSection">
          {categoryData.map((category) => (
              <CategoryCard
                key={category.heading}
                color={category.color}
                heading={category.heading}
                imgPath={category.img}
                categoryList={categoryList}
                setCategoryList={setCategoryList}
              />
            )
          )}
        </div>
      </section>
      <section className="nextPageSection">
        <p className="errorMsg">{errorMsg}</p>
        <button className="nextPageBtn" onClick={saveAndNextPage}>
          Next Page
        </button>
      </section>
    </div>
  );
}
