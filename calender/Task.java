package calender;

import java.util.ArrayList;
import java.util.List;

public class Task {
	static List<Task> tasklist = new ArrayList<Task>();
	int TaskID;
	Time StartTime;
	Time EndTime;
	int duration;
	int repeat;
	int [] Days;
	int empNeeded;
	int priority;
	public Task(int TaskID, Time StartTime, Time EndTime,int duration, int repeat, int [] Days, int empNeeded, int priority)
	{
		this.TaskID = TaskID;
		this.StartTime = StartTime;
		this.EndTime = EndTime;
		this.duration = duration;
		this.repeat = repeat;
		this.Days = Days;
		this.empNeeded = empNeeded;
		this.priority = priority;
		tasklist.add(this);
	}
	public int getTaskID(){return TaskID;}
	public Time getStartTime() {return StartTime;}
	public Time getEndTime() {return EndTime;}
	public int getDuration() {return duration;}
	public int getRepeat() {return repeat;}
	public int[] getDays(){return Days;}
	public int getEmpNeeded() {return empNeeded;}
	public int getPriority() {return priority;}
	
	public void subDuration(int subDuration) {duration = duration - subDuration;}
}
