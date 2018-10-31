package calender;

public class Task {
	int TaskID;
	String name;
	String instruction;
	Time StartTime;
	Time EndTime;
	int duration;
	int repeat;
	boolean [] Days;
	int empNeeded;
	int priority;
	public Task(int TaskID, String name, String instruction, Time StartTime, Time EndTime,
			int duration, int repeat, boolean [] Days, int empNeeded, int priority)
	{
		this.TaskID = TaskID;
		this.name = name;
		this.instruction = instruction;
		this.StartTime = StartTime;
		this.EndTime = EndTime;
		this.duration = duration;
		this.repeat = repeat;
		this.Days = Days;
		this.empNeeded = empNeeded;
		this.priority = priority;
	}
	public int getTaskID(){return TaskID;}
	public String getName(){return name;}
	public String getInstruction(){return instruction;}
	public Time getStartTime() {return StartTime;}
	public Time getEndTime() {return EndTime;}
	public int getDuration() {return duration;}
	public int getRepeat() {return repeat;}
	public boolean[] getDays(){return Days;}
	public int getEmpNeeded() {return empNeeded;}
	public int getPriority() {return priority;}
}
