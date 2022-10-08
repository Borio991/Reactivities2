import { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../stores/store";

function FormActivity() {
  const { activityStore } = useStore();

  const initialState = activityStore.selectedActivity ?? {
    id: "",
    title: "",
    description: "",
    date: "",
    category: "",
    city: "",
    venue: "",
  };
  const [activity, setActivity] = useState<any>(initialState);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    activityStore.selectedActivity ? activityStore.editActivity(activity) : activityStore.createActivity(activity);
  };
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input placeholder="Title" name="title" value={activity.title} onChange={handleChange} />
        <Form.TextArea placeholder="Description" name="description" value={activity.description} onChange={handleChange} />
        <Form.Input placeholder="Category" name="category" value={activity.category} onChange={handleChange} />
        <Form.Input placeholder="Date" name="date" value={activity.date} onChange={handleChange} />
        <Form.Input placeholder="City" name="city" value={activity.city} onChange={handleChange} />
        <Form.Input placeholder="Venue" name="venue" value={activity.venue} onChange={handleChange} />
        <Button floated="right" positive type="submit" content="Submit" />
        <Button floated="right" type="button" content="Cancel" onClick={() => activityStore.setEditMode(false)} />
      </Form>
    </Segment>
  );
}

export default FormActivity;
