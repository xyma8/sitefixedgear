function breadcrumb() {
    const path = window.location.pathname;
    let nameHtml = path.substring(path.lastIndexOf('/') + 1); 
    let URLParams = new URLSearchParams(window.location.search);
    URLParams.delete('page'); // удаляет если есть

    const paramsObject = {};
  
    //let URL = `${nameHtml}?`;
    let URL = 'main.html?';
    let newBreadcrumbItem;
    URLParams.forEach((value, key) => {
      paramsObject[key] = value;
      URL += `${key}=${value}&`;
      newBreadcrumbItem = document.createElement('li');
      var newLink = document.createElement('a');
      newLink.textContent = value;
      newLink.href = URL;
      newBreadcrumbItem.appendChild(newLink);
      breadcrumbList.appendChild(newBreadcrumbItem);
      newBreadcrumbItem.className = 'breadcrumb-item';
    });
  
    newBreadcrumbItem.className = 'breadcrumb-item active';
  }