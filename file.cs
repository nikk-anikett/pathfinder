using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Net.Sockets;
using System.Net;

namespace WindowsFormsAppl
{
public partial class Form1 : For{
    public DataTable dt users Table new DataTable();
    public Form1(){ 
        InitializeComponent();
    }
    private void button1_Click(object sender, EventArgs e) {
        dt_usersTable.Columns.Add("FirstName");
        dt_usersTable.Columns.Add("LastName");
        dt_usersTable.Columns.Add("Email");
        DataRow userRow = dt_usersTable.NewRow();
        userRow["FirstName"] = "Elmer";
        userRow["LastName"] = "Example"; 
        userRow["Email"] = "elmer@example.com";

        DataRow userftow2 = dt_usersTable.NewRow();
        UserRow2 ["FirstName"] = "Elmer2";
        userRow2["LastName"] = "Example2";
        userRow2["Email"]"elmer@example.com2";
        DataRow UserRow3 = dt_usersTable.NewRow();
        userRow3["FirstName"] = "Elmer3";
        userRow3["LastName"] = "Example3";
        userRow3["Email"] = "elmer@example.com3";

        dt_usersTable.Rows.Add(userRow);

        dt_usersTable.Rows.Add(userRow2);

        dt_usersTable.Rows.Add(userRaw3);

        dataGridView1.DataSource = dt_usersTable;

        private void button_senddata_Click(object sender, EventArgs e){
            string udp_host = "127.0.0.1";

            Udpclient webClient = new UdpClient(udp_host, 15000);
            int MAX_BUFFER_SIZE= webClient.Client.SendBufferSize -20-0;

            for (int i = 0; i < dt_usersTable.Rows.Count; i++){

            string res = "";

            string temp="";

            for (int j=0; j<dt_usersTable.Columns.Count; j++)
             temp+= (dt_usersTable.Rows[1][1].ToString() == "o" ? " " : dt_usersTable.Rows[1][1].ToString()) + ',';

//string eata - ("Execution HTM,,,..." + getExecutionHTM() + ".....

            if (res.Length+ temp.Length > MAX_BUFFER_SIZE || (i+1)= dt_usersTable.Rows.Count){
                 if ((1+1)= dt_usersTable.Rows.Count){
                    res += temp;
                 }

// MessageBox.Show(1.ToString()); //res.Replace("OPTSYS"; "OPT SYS"); //res.Replace("FUTFX", "FUTFX SYS"); //res.Replace("FUT", "FUT SYS");

            byte[] sendBytes  = Encoding.UTF8.GetBytes(res.Substring(0, res.Length - 1));
             webclient.Send(sendBytes, sendBytes.Length);

                res = "";
            }
                res+=temp;
        }
    }
}