package calender;

public class Day {
	Task [] DayScheldule;
	public Day()
	{
		DayScheldule = new Task [48];
		
	}
	public void setTask( Task task , Time time)
	{
		DayScheldule [time.getPosition()] = task;
	}
	public Task getTask(Time time)
	{
		return DayScheldule[time.getPosition()];
	}
}
