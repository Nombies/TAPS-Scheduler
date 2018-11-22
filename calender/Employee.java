package calender;

import java.util.*; 

public class Employee {
	static List<Employee> emplist = new ArrayList<Employee>();
	
	int id;
	//array of taskids that this employee can do
	List<Integer> candoTask = new ArrayList<Integer>();

	Week myWeek;
	int workhr;
	public Employee(int id)
	{
		
		this.id = id;
		myWeek = new Week();
		workhr = 0;
		emplist.add(this);
		
	}
	
	public int getId(){return id;}
	
	public void setCanDo(int Taskid)
	{
		candoTask.add(Taskid);
	}
	public boolean getCando(int Taskid)
	{
		for(int i = 0;i < candoTask.size(); i++)
		{
			if(candoTask.get(i) == Taskid) return true;
		}
		return false;
	}
	
	public void setTask(Task task,int day, Time time)
	{
		myWeek.setTask(task, day, time);
	}
	public Task getTask(int day,Time time)
	{
		return myWeek.getTask(day, time);
	}
	
}
