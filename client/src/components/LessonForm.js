import React, { useState } from "react";
import TextInput from "../components/TextInput";
import { __CreateLesson } from "../services/LessonService";
import { __GetLessons } from "../services/LessonService";

const LessonForm = (props) => {
  const { lessons, setNeedsRefresh } = props;
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [link, setLink] = useState("");
  const [complete, setComplete] = useState(false);
  const [formError, setFormError] = useState(false);
  const [accountId, setAccountId] = useState(props.account.id);

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
      case "complete":
        setComplete(fieldValue);
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
        complete: false,
        account_id: accountId,
      };
      const newLesson = await __CreateLesson(formState);
      props.addLesson(newLesson);
      setComplete(false);
    } catch (error) {
      setFormError(true);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextInput
          placeholder="Lesson Name"
          type="text"
          name="title"
          onChange={handleChange}
        />
        <TextInput
          placeholder="Category"
          type="text"
          name="category"
          onChange={handleChange}
        />
        <TextInput
          placeholder="URL"
          type="text"
          name="link"
          onChange={handleChange}
        />
        <button>Add Lesson</button>
      </form>
    </div>
  );
};

export default LessonForm;
