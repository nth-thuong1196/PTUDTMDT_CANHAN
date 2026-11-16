
/* add code here */
var daysOfWeek = new Array("Mon", "Tues", "Wed", "Thur", "Fri");
daysOfWeek.push("Sat");
daysOfWeek.unshift("Sun");
//document.write(daysOfWeek	+	"<br/>");
document.write("<table	border=1>");
document.write("<tr>");
for	(i	=	0;	i	<	daysOfWeek.length;	i++)	{	
if	(daysOfWeek[i].length	<	4)	
day	=	daysOfWeek[i];	
else	
day	=	"<em>"	+	daysOfWeek[i]	+	"</em>";	
document.write("<th>"	+	day	+	"</th>");	
}

document.write("</tr>");
for (i = 0; i < 31; i++) {
    if (i % 7 == 0) {
        document.write("<tr>");
    }
    document.write("<td>" + (i+1) + "</td>");
}
//document.write("</tr>");
//document.write("</table>");	