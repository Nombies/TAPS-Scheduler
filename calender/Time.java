package calender;

public class Time {
	String time;
	int position;
	int hr;
	int minute;
	String m;
	public Time(String inputtime)
	{
		position = 0;
		time = inputtime;
		//7:00AM
		if(time.length() == 6)
		{
			hr = Integer.parseInt(time.substring(0, 1));
			minute = Integer.parseInt(time.substring(2, 4));
			m = time.substring(4);
		}
		//11:00AM
		else
		{
			hr = Integer.parseInt(time.substring(0, 2));
			minute = Integer.parseInt(time.substring(3, 5));
			m = time.substring(5);
		}
		//setting position
		if(m.equals("PM")) hr = hr + 12;
		position = position + minute/15;
		position = position + (hr - 7) * 4; 
	}
	public int getPosition(){return position;}
	public String getTime() {return time;}
}
