package calender;

public class Employee {
	String FirstName;
	String MiddleName;
	String LastName;
	String Email;
	String Phone;
	int id;
	boolean modify;
	boolean att;
	String UserName;
	String salt;
	String PassHash;
	Week myWeek;
	int workhr;
	public Employee(String FirstName,String MiddleName,String LastName,String Email,String Phone,int id, boolean modify, boolean att, String UserName,
			 String salt, String PassHash)
	{
		this.FirstName = FirstName;
		this.MiddleName = MiddleName;
		this.LastName = LastName;
		this.Email = Email;
		this.Phone = Phone;
		this.id = id;
		this.modify= modify;
		this.att = att;
		this.UserName = UserName;
		this.salt = salt;
		this.PassHash = PassHash;
		myWeek = new Week();
		workhr = 0;
	}
	public String getFirstName(){return FirstName;}
	public String getMiddleName(){return MiddleName;}
	public String getLastName(){return LastName;}
	public String getEmail(){return Email;}
	public String getPhone(){return Phone;}
	public String getUserName(){return FirstName;}
	public int getId(){return id;}
	public boolean getModify(){return modify;}
	public String getSalt(){return salt;}
	public String getPassHash(){return PassHash;}
	public boolean getAtt(){return att;}
	public void setTask(Task task,int day, Time time)
	{
		myWeek.setTask(task, day, time);
	}
	public Task getTask(int day,Time time)
	{
		return myWeek.getTask(day, time);
	}
}
