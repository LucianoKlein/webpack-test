<div class="layer">
    <img src="${require('../../assets/bg_01.jpg')}" />
    <div>this is <%= name %> tpl</div>
    <% for (var i = 0; i < arr.length; i++) { %>
        <h1><%= arr[i] %></h1>
    <% } %>
    <ul>
    <% for (var key in object) { %>
        <li><%= key %>:<%= object[key] %></li>
    <% } %>
    </ul>
</div>