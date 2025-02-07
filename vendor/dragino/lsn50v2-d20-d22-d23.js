function decodeUplink(input) {
	var port = input.fPort;
	var bytes = input.bytes;
	var mode=(bytes[6] & 0x7C)>>2;
	var data = {};
	 switch (input.fPort) {
		 case 2:
if(mode=='3')
{
  data.Work_mode="DS18B20";
  data.battery=(bytes[0]<<8 | bytes[1])/1000;
  data.ALARM_status=(bytes[6] & 0x01)? "TRUE":"FALSE";
  
  if((bytes[2]==0xff)&& (bytes[3]==0xff))
  {
    data.temperature_1="NULL";
  }
  else
  {
    data.temperature_1= parseFloat(((bytes[2]<<24>>16 | bytes[3])/10).toFixed(1));
  }

  if((bytes[7]==0xff)&& (bytes[8]==0xff))
  {
    data.temperature_2="NULL";
  }
  else
  {
  	data.temperature_2=parseFloat(((bytes[7]<<24>>16 | bytes[8])/10).toFixed(1));
  }
  
  if((bytes[9]==0xff)&& (bytes[10]==0xff))
  {
    data.temperature_3="NULL";
  }
  else
  {
  	data.temperature_3=parseFloat(((bytes[9]<<24>>16 | bytes[10])/10) .toFixed(1));
  }
}
else if(mode=='31')
{
  data.Work_mode="ALARM";
  data.temperature_1_min= bytes[4]<<24>>24;
  data.temperature_1_max= bytes[5]<<24>>24;
  data.temperature_2_min= bytes[7]<<24>>24;
  data.temperature_2_max= bytes[8]<<24>>24;
  data.temperature_3_min= bytes[9]<<24>>24;
  data.temperature_3_max= bytes[10]<<24>>24;
}

  if(bytes.length==11)
  return {
      data: data,
    }
	break;
default:
    return {
      errors: ["unknown FPort"]
    }
  }
}