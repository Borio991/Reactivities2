import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/ActivityModel";
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

  get ActivitiesByDate() {
    return Array.from(
      this.activities.slice().sort(function (a: any, b: any) {
        return Date.parse(b.date) - Date.parse(a.date);
      })
    );
  }

  get groupedActivities() {
    return Object.entries(
      this.ActivitiesByDate.reduce((activities, activity) => {
        const date = activity.date;
        activities[date] = activities[date] ? [...activities[date], activity] : [activity];
        return activities;
      }, {} as { [key: string]: Activity[] })
    );
  }

  loadActivity = async (id: string) => {
    let activity = this.activities.find((x) => x.id === id);
    if (activity) {
      this.selectedActivity = activity;
      return activity;
    } else {
      try {
        activity = await agent.Activities.details(id);
        runInAction(() => {
          activity!.date = activity!.date.split("T")[0];
          this.selectedActivity = activity;
        });
        return activity;
      } catch (error) {
        console.log(error);
      }
    }
  };

  createActivity = async (activity: Activity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activities.push(activity);
        this.selectedActivity = activity;
        this.submitting = false;
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
