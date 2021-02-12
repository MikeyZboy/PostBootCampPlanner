import React, { useState } from "react";
import TextInput from "../components/TextInput";
import { __CreateLesson } from "../services/LessonService";
import { __GetLessons } from "../services/LessonService";
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  height: 75%;
  width: 50%;
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
      setFormError(true);
    }
  };

  return (
    <Container>
      <form className="inapp-form" onSubmit={handleSubmit}>
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
        <button>Add</button>
      </form>
    </Container>
  );
};

export default LessonForm;
