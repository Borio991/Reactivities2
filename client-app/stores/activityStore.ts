import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/ActivityModel";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";

export default class ActivityStore {
  constructor() {
    makeAutoObservable(this);
  }
  // observable
  activities: Activity[] = [];
  selectedActivity: Activity | undefined = undefined;
  editmode: boolean = false;
  initialLoading: boolean = false;
  submitting: boolean = false;

  // Actions
  get ActivitiesByDate() {
    return Array.from(
      this.activities.slice().sort(function (a: any, b: any) {
        return Date.parse(b.date) - Date.parse(a.date);
      })
    );
  }
  loadActivities = async () => {
    this.initialLoading = true;
    try {
      const response = await agent.Activities.list();
      runInAction(() => {
        for (let i = 0; i < response.length; i++) {
          const activity = response[i];
          activity.date = activity.date.split("T")[0];
        }
        this.activities = response;
        this.initialLoading = false;
      });
    } catch (error) {
      this.initialLoading = true;
      console.log(error);
    }
  };

  selectActivity = (id?: string) => {
    this.selectedActivity = this.activities.find((x) => x.id === id);
    if (!id) {
      this.editmode = false;
    }
  };

  setEditMode = (state: boolean) => {
    this.editmode = state;
  };

  openCreateForm = () => {
    this.selectedActivity = undefined;
    this.editmode = true;
  };

  createActivity = async (activity: Activity) => {
    this.submitting = true;
    try {
      activity.id = uuid();
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activities.push(activity);
        this.selectedActivity = activity;
        this.submitting = false;
        this.editmode = false;
      });
    } catch (error) {
      this.submitting = false;
      console.log(error);
    }
  };
  editActivity = async (activity: Activity) => {
    this.setSubmitting(true);
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.activities = [...this.activities.filter((x) => x.id !== activity.id), activity];
        this.selectedActivity = activity;
        this.setSubmitting(false);
        this.editmode = false;
      });
    } catch (error) {
      this.setSubmitting(false);
      console.log(error);
    }
  };

  deleteActivity = async (id: string) => {
    this.setSubmitting(true);
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activities = [...this.activities.filter((x) => x.id !== id)];
        if (this.selectedActivity?.id === id) {
          this.selectedActivity = undefined;
        }
        this.setSubmitting(false);
        this.editmode = false;
      });
    } catch (error) {
      this.setSubmitting(false);
      console.log(error);
    }
  };

  setSubmitting = (state: boolean) => {
    this.submitting = state;
  };
}
