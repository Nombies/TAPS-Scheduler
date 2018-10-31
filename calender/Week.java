package calender;

public class Week {
	Day [] WeekScheldule;
	public Week()
	{
		WeekScheldule = new Day [7];
		for( int i=0; i<7; i++ )
		    WeekScheldule[i] = new Day();
	}
	public void setTask(Task task,int day, Time time)
	{
		WeekScheldule[day].setTask(task, time);
		
	}
	public Task getTask(int day,Time time)
	{
		return WeekScheldule[day].getTask(time);
	}
}
