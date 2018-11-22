package calender;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import javax.net.ssl.HttpsURLConnection;

public class getserver {

	private final String USER_AGENT = "Mozilla/5.0";

	public static void main(String[] args) throws Exception {

		getserver http = new getserver();
		String url;
		StringBuffer test;
		/*
		System.out.println("Testing 1 - Send Http GET request");
		url = "http://54.183.177.213:4000/api/getAllEmployees";
		test = http.sendGet(url);
		parseEmpList(test);
		
		
		url = "http://54.183.177.213:4000/api/getAllTasks";
		test = http.sendGet(url);
		parseTaskList(test);
		*/
		
		/*
		//dont have these 2 implemented yet in objects
		url = "http://54.183.177.213:4000/api/getAllCanDo";
		http.sendGet(url);
		url = "http://54.183.177.213:4000/api/getAllNotAvailable";
		http.sendGet(url);
		*/
		/*
		not needed
		url = "http://54.183.177.213:4000/api/getAllWeekHr";
		http.sendGet(url);
		*/
		
		/*
		for(int i = 0; i < Employee.emplist.size(); i ++)
		{
			System.out.println(Employee.emplist.get(i).getId());
		}
		*/
	}
	private StringBuffer sendGet(String url) throws Exception {

		
		
		URL obj = new URL(url);
		HttpURLConnection con = (HttpURLConnection) obj.openConnection();

		// optional default is GET
		con.setRequestMethod("GET");

		//add request header
		con.setRequestProperty("User-Agent", USER_AGENT);

		int responseCode = con.getResponseCode();
		System.out.println("\nSending 'GET' request to URL : " + url);
		System.out.println("Response Code : " + responseCode);
		BufferedReader in = new BufferedReader(
		        new InputStreamReader(con.getInputStream()));
		String inputLine;
		StringBuffer response = new StringBuffer();

		while ((inputLine = in.readLine()) != null) {
			response.append(inputLine);
		}
		in.close();

		//print result
		System.out.println(response.toString());
		
		return response;
	}
	public static int firstindex(String s, String c)
	{
		for(int i = 0; i< s.length(); i++)
		{
		
			if(s.substring(i, i+1).equals(c)) return i;
		}
		return -1;
	}
	public static int firstindex(StringBuffer s, String c)
	{
		for(int i = 0; i< s.length(); i++)
		{
		
			if(s.substring(i, i+1).equals(c)) return i;
		}
		return -1;
	}
	
	public static void parseEmpList(StringBuffer thelist)
	{
		StringBuffer mydata = thelist;
		
		String temp = "";
		for(int i = 0; i<1000; i ++)
		{
			if(mydata.lastIndexOf("{") == -1) break;
			temp= mydata.substring(mydata.lastIndexOf("{"), mydata.lastIndexOf("}")+1);
			
			//get empid
			int empint = Integer.parseInt(temp.substring(firstindex(temp,":")+1,firstindex(temp,",")));;
			//System.out.println(tempint);
			new Employee(empint);
			mydata.delete(mydata.lastIndexOf("{"), mydata.lastIndexOf("}")+1);
			
		}
		
	}
	public static void parseTaskList(StringBuffer thelist)
	{
		StringBuffer mydata = thelist;
	
		
		for(int i = 0; i<1000; i ++)
		{
			if(mydata.lastIndexOf("{") == -1) break;
			StringBuffer temp= new StringBuffer(mydata.substring(mydata.lastIndexOf("{"), mydata.lastIndexOf("}")+1));
			//int TaskID, Time StartTime, Time EndTime,int duration, int repeat, boolean [] Days, int empNeeded, int priority
			System.out.println(temp.toString());
			int Taskid = Integer.parseInt(temp.substring(firstindex(temp,":")+1,firstindex(temp,",")));
			
			int startint = temp.lastIndexOf("earliest_start");
			int endint = temp.lastIndexOf("latest_end");
			int durint = temp.lastIndexOf("duration");
			int repint = temp.lastIndexOf("reps");
			int empint = temp.lastIndexOf("employees_needed");
			
			String starttime = temp.substring(startint + 17, startint + 17 + 5);
			String endtime = temp.substring(endint + 13, endint + 13 + 5);
			int duration = Integer.parseInt(temp.substring(durint + 10, durint + 10 + 1));
			int repeat = Integer.parseInt(temp.substring(repint + 14, repint + 14 + 1));
			int empneeded = Integer.parseInt(temp.substring(empint + 18, empint + 18 + 1));
			/*
			System.out.println("empneeded " + empneeded);
			System.out.println("duration " + duration);
			System.out.println("repeat " + repeat);
			System.out.println("starttime " + starttime);
			System.out.println("endtime " + endtime);
			System.out.println("taskid " + Taskid);
			*/
			int [] Days = new int[7];
			int daysint = temp.lastIndexOf("sunday");
			//String days = temp.substring(daysint + 19, daysint + 19+ 5);
			Days[0] = Integer.parseInt(temp.substring(daysint + 8, daysint + 8 + 1));
			Days[1] = Integer.parseInt(temp.substring(daysint + 19, daysint + 19 + 1));
			Days[2] = Integer.parseInt(temp.substring(daysint + 31, daysint + 31 + 1));
			Days[3] = Integer.parseInt(temp.substring(daysint + 45, daysint + 45 + 1));
			Days[4] = Integer.parseInt(temp.substring(daysint + 58, daysint + 58 + 1));
			Days[5] = Integer.parseInt(temp.substring(daysint + 69, daysint + 69 + 1));
			Days[6] = Integer.parseInt(temp.substring(daysint + 82, daysint + 82 + 1));
			
			//for(int m = 0; m < Days.length; m++) System.out.println(Days[m]);
			
			//System.out.println(days);
			new Task(Taskid, new Time(starttime), new Time(endtime), duration,repeat,Days,empneeded,1);
			
			mydata.delete(mydata.lastIndexOf("{"), mydata.lastIndexOf("}")+1);
			
		}
		
	}
	}


	

