package calender;

public class test {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		boolean [] testing = new boolean [7];
		Time xd = new Time("7:00AM");
		Employee test = new Employee("chad","test","donkey","1@hotm.com","415-111-1234",2,true,true,"lol2","aeag","adsgadf");
		Task omegalul = new Task(1,"name","instr",xd,xd,1,1,testing,1,2);
		/*
		System.out.println(test.getFirstName());
		System.out.println(test.getMiddleName());
		System.out.println(test.getLastName());
		System.out.println(test.getEmail());
		System.out.println(test.getPhone());
		System.out.println(test.getId());
		System.out.println(test.getModify());
		System.out.println(test.getAtt());
		System.out.println(test.getUserName());
		System.out.println(test.getSalt());
		System.out.println(test.getPassHash());
		*/
		//System.out.println(omegalul.getName());
		test.setTask(omegalul, 1, xd);
		//System.out.println(test.getTask(2,xd).getName());
		//Week sample = new Week();
		//sample.setTask(omegalul, 0, xd);
		//Day [] WeekScheldule = new Day [7];
		//WeekScheldule[0].setTask(omegalul,xd);
		//Day wdf = new Day();
		//WeekScheldule[0] = wdf;
		//wdf.setTask(omegalul, xd);
	}

}
