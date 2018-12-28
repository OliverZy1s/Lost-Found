class Picker {
  switch_A(column, data){
    switch (column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['一楼', '二楼'];
            break;
          case 1:
            data.multiArray[1] = ['图书馆一楼', '图书馆二楼'];
            break;
          case 2:
            data.multiArray[1] = ['一食堂一楼', '一食堂二楼'];
            break;
        }
        data.multiIndex[1] = 0;
        break;
    }
    return data
  }

  switch_B(column, data) {
    console.log(column)
    // console.log(data)
    switch (column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['一楼', '二楼'];
            break;
          case 1: 
            console.log(1)
            data.multiArray[1] = ['图书馆一楼', '图书馆二楼'];
            break;
        }
        data.multiIndex[1] = 0;
        break;
    }
    return data
  }

  switch_C(column, data) {
    switch (column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['一楼', '二楼'];
            break;
          case 1:
            data.multiArray[1] = ['图书馆一楼', '图书馆二楼', '图书馆三楼'];
            break;
        }
        data.multiIndex[1] = 0;
        break;
    }
    return data
  }
  

  switch_D(column, data) {
    switch (column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['一楼', '二楼'];
            break;
          case 1:
            data.multiArray[1] = ['图书馆一楼', '图书馆二楼'];
            break;
        }
        data.multiIndex[1] = 0;
        break;
    }
    return data
  }
  
}

export { Picker }