<div class="layer">
    <div>this is <%= name %> tpl</div>
    <% for (var i = 0; i < arr.length; i++) { %>
        <h1><%= arr[i] %></h1>
    <% } %>
    <% for (var key in object) { %>
        <li><%= key %>:<%= object[key] %></li>
    <% } %>
</div>