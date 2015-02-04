---
layout: post
title:  "First post!"
date:   2015-02-01 09:51:47
---
I don't have much to report yet.  For now, here is a snippet for calculating the power set of a list.  

{% highlight elixir %}
defmodule PowerSet do
  def of_list([]), do: [[]]
  def of_list([head | tail]) do
    of_list(tail)
    |> Enum.flat_map &[&1, [head | &1]]
  end
end

PowerSet.of_list [2, 1, "foo"]
# [[], [2], [1], [2, 1], ["foo"], [2, "foo"], [1, "foo"], [2, 1, "foo"]]
{% endhighlight %}
