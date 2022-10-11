import { useEffect, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import { v4 as uuid } from "uuid";
import { Link, useParams, useNavigate } from "react-router-dom";

function FormActivity() {
  const { activityStore } = useStore();
  const { id } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState<any>({
    id: "",
    title: "",
    description: "",
    date: "",
    category: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (id) activityStore.loadActivity(id).then((activity) => setActivity(activity));
    if (!id)
      setActivity({
        id: "",
        title: "",
        description: "",
        date: "",
        category: "",
        city: "",
        venue: "",
      });
  }, [id, activityStore.loadActivity]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(activity);
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      activityStore.createActivity(newActivity);
      navigate(`/activities/${newActivity.id}`);
    } else {
      activityStore.editActivity(activity);
      navigate(`/activities/${activity.id}`);
    }
  };
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input placeholder="Title" name="title" value={activity?.title} onChange={handleChange} />
        <Form.TextArea
          placeholder="Description"
          name="description"
          value={activity?.description}
          onChange={handleChange}
        />
        <Form.Input
          placeholder="Category"
          name="category"
          value={activity?.category}
          onChange={handleChange}
        />
        <Form.Input
          placeholder="Date"
          name="date"
          type="date"
          value={activity?.date}
          onChange={handleChange}
        />
        <Form.Input placeholder="City" name="city" value={activity?.city} onChange={handleChange} />
        <Form.Input placeholder="Venue" name="venue" value={activity?.venue} onChange={handleChange} />
        <Button floated="right" positive type="submit" content="Submit" loading={activityStore.submitting} />
        <Button floated="right" type="button" content="Cancel" as={Link} to="/activities" />
      </Form>
    </Segment>
  );
}

export default FormActivity;
