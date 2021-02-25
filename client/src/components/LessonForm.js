import React, { useState } from "react";
import TextInput from "../components/TextInput";
import { __CreateLesson } from "../services/LessonService";
import { __GetLessons } from "../services/LessonService";
import styled from 'styled-components'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 20px;
`;

const InlineForm = styled.form`
  margin: 0 auto;
  display: inline-block;
  background-color: transparent;
`;

const Button = styled.svg`
  display: block;
  border: transparent;
  background-color: transparent;
  color: white;
  margin: 0 auto;
  margin-top: 20px;
  padding: 5px;
  height: 40px;
  width: 40px;
`;

const LessonForm = (props) => {

  const { account, lessons, setNeedsRefresh } = props;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [link, setLink] = useState("");
  const [status, setStatus] = useState("");
  const [formError, setFormError] = useState(false);

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    switch (fieldName) {
      case "title":
        setTitle(fieldValue);
        break;
      case "category":
        setCategory(fieldValue);
        break;
      case "link":
        setLink(fieldValue);
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formState = {
        title: title,
        category: category,
        link: link,
        status: "Not Started",
        account_id: account.id,
      };
      const newLesson = await __CreateLesson(formState);
      props.addLesson(newLesson);
      e.target.reset()
    } catch (error) {
      console.log(error)
      setFormError(true);
    }
  };

  return (
    <Container>
      <InlineForm onSubmit={handleSubmit}>
        <TextInput
          placeholder="Lesson"
          type="text"
          name="title"
          value={props.value}
          onChange={handleChange}
        />
        <TextInput
          placeholder="Category"
          type="text"
          name="category"
          value={props.value}
          onChange={handleChange}
        />
        <TextInput
          placeholder="Link"
          type="text"
          name="link"
          value={props.value}
          onChange={handleChange}
        />
        <Button onClick={(e)=> {handleSubmit(e)}}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </InlineForm>
    </Container>
  );
};

export default LessonForm;
