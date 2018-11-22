package calender;

public class Time {
	String time;
	int position;
	int hr;
	int minute;
	
	public Time(String inputtime)
	{
		position = 0;
		time = inputtime;
		//7:00AM
		if(time.length() == 4)
		{
			hr = Integer.parseInt(time.substring(0, 1));
			minute = Integer.parseInt(time.substring(2));
			
		}
		//11:00AM
		else
		{
			hr = Integer.parseInt(time.substring(0, 2));
			minute = Integer.parseInt(time.substring(3));
			;
		}
		//setting position
		
		position = position + minute/30;
		position = position + (hr - 7)*2 ; 
	}
	public int getPosition(){return position;}
	public String getTime() {return time;}
}
