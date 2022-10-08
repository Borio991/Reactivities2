import axios from "axios";
import { makeAutoObservable } from "mobx";
import { Activity } from "../models/ActivityModel";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
  constructor() {
    makeAutoObservable(this);
  }
  // observable
  activities: Activity[] = [];
  selectedActivity: Activity | undefined = undefined;
  editmode: boolean = false;

  // Actions
  loadActivities = async () => {
    const response = await axios.get("http://localhost:5000/api/activities");
    this.activities = response.data;
  };

  selectActivity = (id: string) => {
    this.selectedActivity = this.activities.find((x) => x.id === id);
  };

  setEditMode = (state: boolean) => {
    this.editmode = state;
  };

  openCreateForm = () => {
    this.selectedActivity = undefined;
    this.editmode = true;
  };

  createActivity = (activity: Activity) => {
    activity.id = uuid();
    this.activities.push(activity);
    this.selectedActivity = activity;
    this.editmode = false;
  };
  editActivity = (activity: Activity) => {
    this.activities = [...this.activities.filter((x) => x.id !== activity.id), activity];
    this.selectedActivity = activity;
    this.editmode = false;
  };

  deleteActivity = (id: string) => {
    this.activities = [...this.activities.filter((x) => x.id !== id)];
    if (this.selectedActivity?.id === id) {
      this.selectedActivity = undefined;
    }
    this.editmode = false;
  };
}
